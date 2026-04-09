type ApiRequest = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  socket?: {
    remoteAddress?: string;
  };
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (statusCode: number) => {
    json: (body: Record<string, boolean | string>) => void;
  };
};

type SubmissionRequestBody = {
  name?: string;
  email?: string;
  message?: string;
  botcheck?: string;
};

type NormalizedSubmission = {
  name: string;
  email: string;
  message: string;
  botcheck: string;
};

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

const FORM_LIMITS = {
  NAME: 80,
  EMAIL: 120,
  MESSAGE: 4000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const submissionHistory = new Map<string, number[]>();

const getAccessKey = () => {
  return (
    process.env.WEB3FORMS_ACCESS_KEY ??
    process.env.VITE_WEB3FORMS_ACCESS_KEY ??
    process.env.REACT_APP_WEB3FORMS_ACCESS_KEY ??
    ""
  );
};

const parseRequestBody = (body: unknown): SubmissionRequestBody | null => {
  if (typeof body === "string") {
    try {
      const parsedBody = JSON.parse(body) as unknown;
      return typeof parsedBody === "object" && parsedBody !== null
        ? (parsedBody as SubmissionRequestBody)
        : null;
    } catch {
      return null;
    }
  }

  return typeof body === "object" && body !== null ? (body as SubmissionRequestBody) : null;
};

const normalizeSubmission = (body: SubmissionRequestBody): NormalizedSubmission => ({
  name: typeof body.name === "string" ? body.name.trim() : "",
  email: typeof body.email === "string" ? body.email.trim() : "",
  message: typeof body.message === "string" ? body.message.trim() : "",
  botcheck: typeof body.botcheck === "string" ? body.botcheck.trim() : "",
});

const validateSubmission = (submission: NormalizedSubmission) => {
  if (submission.botcheck) {
    return "Spam detected.";
  }

  if (!submission.name || !submission.email || !submission.message) {
    return "Missing required fields.";
  }

  if (submission.name.length > FORM_LIMITS.NAME) {
    return `Name must be ${FORM_LIMITS.NAME} characters or fewer.`;
  }

  if (submission.email.length > FORM_LIMITS.EMAIL || !EMAIL_PATTERN.test(submission.email)) {
    return "Please enter a valid email address.";
  }

  if (submission.message.length > FORM_LIMITS.MESSAGE) {
    return `Message must be ${FORM_LIMITS.MESSAGE} characters or fewer.`;
  }

  return null;
};

const getClientIdentifier = (req: ApiRequest) => {
  const forwardedForHeader = req.headers["x-forwarded-for"];

  if (Array.isArray(forwardedForHeader) && forwardedForHeader.length > 0) {
    return forwardedForHeader[0] ?? "anonymous";
  }

  if (typeof forwardedForHeader === "string" && forwardedForHeader.length > 0) {
    return forwardedForHeader.split(",")[0]?.trim() || "anonymous";
  }

  return req.socket?.remoteAddress || "anonymous";
};

const isRateLimited = (clientIdentifier: string) => {
  const now = Date.now();
  const recentSubmissions = (submissionHistory.get(clientIdentifier) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    submissionHistory.set(clientIdentifier, recentSubmissions);
    return true;
  }

  recentSubmissions.push(now);
  submissionHistory.set(clientIdentifier, recentSubmissions);
  return false;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const accessKey = getAccessKey();

  if (!accessKey) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const parsedBody = parseRequestBody(req.body);

  if (!parsedBody) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const normalizedSubmission = normalizeSubmission(parsedBody);
  const validationError = validateSubmission(normalizedSubmission);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const clientIdentifier = getClientIdentifier(req);

  if (isRateLimited(clientIdentifier)) {
    return res.status(429).json({ error: "Too many submissions. Please try again later." });
  }

  const payload = {
    access_key: accessKey,
    name: normalizedSubmission.name,
    email: normalizedSubmission.email,
    message: normalizedSubmission.message,
    subject: `New Contact Form Submission from ${normalizedSubmission.name}`,
    botcheck: normalizedSubmission.botcheck,
    replyto: normalizedSubmission.email,
    from_name: normalizedSubmission.name,
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as Web3FormsResponse;

    if (response.ok && data.success) {
      return res.status(200).json({ success: true });
    }

    return res.status(response.status).json({ error: data.message || "Submission failed" });
  } catch (error) {
    console.error("Submission error:", error);
    return res.status(500).json({ error: "Server error during submission" });
  }
}