import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  let formValues;
  try {
    formValues = req.body; // Assuming JSON body from React form
  } catch (error) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // Prepare the payload for web3forms (mirroring your original logic)
  const payload = {
    access_key: accessKey,
    name: formValues.name?.trim() || '',
    email: formValues.email?.trim() || '',
    message: formValues.message?.trim() || '',
    subject: `New Contact Form Submission from ${formValues.name?.trim() || 'Anonymous'}`,
    botcheck: '',
    replyto: formValues.email?.trim() || '',
    from_name: formValues.name?.trim() || ''
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(response.status).json({ error: data.message || 'Submission failed' });
    }
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ error: 'Server error during submission' });
  }
}
