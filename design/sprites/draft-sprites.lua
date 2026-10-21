-- Draft pixel assets. Run from the repo root:
-- Aseprite.exe -b --script design/sprites/draft-sprites.lua
-- Writes design/sprites/*.aseprite plus exports: 4-frame project sprite sheets
-- (src/assets/sprites) and the board tile (src/assets).

local pc = app.pixelColor
local INKS = {
  k = pc.rgba(0xE6, 0xE6, 0xDF, 255), -- silk
  g = pc.rgba(0x5A, 0x5D, 0x5F, 255), -- outline grey
  r = pc.rgba(0xE5, 0x48, 0x4D, 255), -- led
}

local SPRITES = {
  robot = {
    "................",
    ".......rr.......",
    ".......kk.......",
    "...kkkkkkkkkk...",
    "...k........k...",
    "...k.rr..rr.k...",
    "...k.rr..rr.k...",
    "...k........k...",
    "...kkkkkkkkkk...",
    "....kgggggggk...",
    "....kgkgkgkgk...",
    "....kkkkkkkkk...",
    "..kkk.......kkk.",
    ".kgggk.....kgggk",
    ".kgkgk.....kgkgk",
    "..kkk.......kkk.",
  },
  satellite = {
    "................",
    "................",
    ".......rr.......",
    ".......kk.......",
    "......kkkk......",
    "kkkkk.kggk.kkkkk",
    "kgkgk.kggk.kgkgk",
    "kgkgkkkrrkkkgkgk",
    "kgkgk.kggk.kgkgk",
    "kkkkk.kggk.kkkkk",
    "......kkkk......",
    ".......kk.......",
    "......k..k......",
    "................",
    "................",
    "................",
  },
  arm = {
    "................",
    "................",
    ".........kkk..rr",
    ".........k.kkkr.",
    ".........kkk..rr",
    "........k.......",
    ".......k........",
    "....kkk.........",
    "....k.k.........",
    "....kkk.........",
    ".....k..........",
    ".....k..........",
    "...kkkkk........",
    "...kgggk........",
    "..kkkkkkk.......",
    "................",
  },
  forklift = {
    "................",
    "................",
    "....rr..........",
    "...kkkk.........",
    "...k..k.....k...",
    "...k..k.....k...",
    "...k..k.....k...",
    "..kkkkkkkkk.k...",
    "..kgggggggk.k...",
    "..kgggggggkkk...",
    "..kkkkkkkkk.kkkk",
    "..kkk...kkk.....",
    "..kgk...kgk.....",
    "..kkk...kkk.....",
    "................",
    "................",
  },
}

-- Per-frame pixel edits {x, y, char} (0-based) applied to the base map; frames run left to right.
local FRAMES = {
  robot = {
    {},
    { { 5, 5, "g" }, { 6, 5, "g" }, { 9, 5, "g" }, { 10, 5, "g" }, { 5, 6, "g" }, { 6, 6, "g" }, { 9, 6, "g" }, { 10, 6, "g" } },
    {},
    { { 7, 1, "g" }, { 8, 1, "g" } },
  },
  satellite = {
    {},
    { { 7, 7, "g" }, { 8, 7, "g" } },
    {},
    { { 7, 2, "g" }, { 8, 2, "g" } },
  },
  arm = {
    {},
    { { 15, 2, "." }, { 15, 4, "." } },
    { { 14, 2, "." }, { 15, 2, "." }, { 14, 4, "." }, { 15, 4, "." }, { 15, 3, "r" } },
    { { 15, 2, "." }, { 15, 4, "." } },
  },
  forklift = {
    {},
    { { 4, 2, "g" }, { 5, 2, "g" }, { 13, 10, "." }, { 14, 10, "." }, { 15, 10, "." }, { 13, 9, "k" }, { 14, 9, "k" }, { 15, 9, "k" } },
    { { 13, 10, "." }, { 14, 10, "." }, { 15, 10, "." }, { 13, 9, "k" }, { 14, 9, "k" }, { 15, 9, "k" } },
    { { 4, 2, "g" }, { 5, 2, "g" } },
  },
}

local TRACE_FAINT = pc.rgba(0x20, 0x23, 0x25, 255)
local CLEAR = pc.rgba(0, 0, 0, 0)

local root = app.fs.currentPath
local function path(...) return app.fs.joinPath(root, ...) end

local function newSprite(w, h, colors)
  local sprite = Sprite(w, h, ColorMode.RGB)
  local palette = Palette(#colors + 1)
  palette:setColor(0, Color { r = 0, g = 0, b = 0, a = 0 })
  for i, c in ipairs(colors) do palette:setColor(i, Color(c)) end
  sprite:setPalette(palette)
  return sprite
end

-- Draws a char map with each art pixel as a scale x scale block.
local function drawMap(image, rows, inks, ox, oy, scale)
  for y, row in ipairs(rows) do
    for x = 1, #row do
      local ink = inks[row:sub(x, x)]
      if ink then
        for dy = 0, scale - 1 do
          for dx = 0, scale - 1 do image:drawPixel(ox + (x - 1) * scale + dx, oy + (y - 1) * scale + dy, ink) end
        end
      end
    end
  end
end

local function applyEdits(rows, edits)
  local out = {}
  for i, row in ipairs(rows) do out[i] = row end
  for _, e in ipairs(edits) do
    local x, y, ch = e[1], e[2], e[3]
    local row = out[y + 1]
    out[y + 1] = row:sub(1, x) .. ch .. row:sub(x + 2)
  end
  return out
end

-- Project sprite sheets: 4 frames of 16x16, side by side.
for name, rows in pairs(SPRITES) do
  assert(#rows == 16, name .. ": expected 16 rows")
  for y, row in ipairs(rows) do assert(#row == 16, name .. ": row " .. y .. " is not 16 wide") end
  local sprite = newSprite(64, 16, { INKS.k, INKS.g, INKS.r })
  for frame, edits in ipairs(FRAMES[name]) do
    drawMap(sprite.cels[1].image, applyEdits(rows, edits), INKS, (frame - 1) * 16, 0, 1)
  end
  sprite:saveAs(path("design", "sprites", name .. ".aseprite"))
  sprite:saveCopyAs(path("src", "assets", "sprites", name .. ".png"))
  sprite:close()
end

-- Board tile: 128x128, 2px traces at 0/45/90 degrees; edge-crossing traces exit where they enter.
local TILE_TRACES = {
  { { 0, 18 }, { 40, 18 }, { 50, 28 }, { 80, 28 }, { 90, 18 }, { 127, 18 } },
  { { 0, 84 }, { 127, 84 } },
  { { 100, 0 }, { 100, 60 }, { 110, 70 }, { 110, 100 }, { 100, 110 }, { 100, 127 } },
  { { 20, 40 }, { 20, 62 }, { 32, 74 } },
  { { 56, 100 }, { 80, 100 } },
  { { 60, 40 }, { 72, 40 }, { 80, 48 } },
}
local TILE_VIAS = {
  { 100, 18 }, { 100, 84 }, { 30, 84 }, { 70, 84 },
  { 20, 40 }, { 32, 74 }, { 56, 100 }, { 80, 100 }, { 60, 40 }, { 80, 48 },
}

local function line(a, b, plot)
  local x0, y0, x1, y1 = a[1], a[2], b[1], b[2]
  local dx, dy = math.abs(x1 - x0), -math.abs(y1 - y0)
  local sx, sy = x0 < x1 and 1 or -1, y0 < y1 and 1 or -1
  local err = dx + dy
  while true do
    plot(x0, y0)
    if x0 == x1 and y0 == y1 then return end
    local e2 = 2 * err
    if e2 >= dy then err = err + dy; x0 = x0 + sx end
    if e2 <= dx then err = err + dx; y0 = y0 + sy end
  end
end

local tile = newSprite(128, 128, { TRACE_FAINT })
local tileImage = tile.cels[1].image
for _, trace in ipairs(TILE_TRACES) do
  for i = 2, #trace do
    local a, b = trace[i - 1], trace[i]
    local vertical = a[1] == b[1]
    line(a, b, function(x, y)
      tileImage:drawPixel(x, y, TRACE_FAINT)
      if vertical then tileImage:drawPixel(x + 1, y, TRACE_FAINT) else tileImage:drawPixel(x, y + 1, TRACE_FAINT) end
    end)
  end
end
for _, via in ipairs(TILE_VIAS) do
  for dy = -1, 1 do
    for dx = -1, 1 do tileImage:drawPixel(via[1] + dx, via[2] + dy, (dx == 0 and dy == 0) and CLEAR or TRACE_FAINT) end
  end
end
tile:saveAs(path("design", "sprites", "board-tile.aseprite"))
tile:saveCopyAs(path("src", "assets", "board-tile.png"))
tile:close()
