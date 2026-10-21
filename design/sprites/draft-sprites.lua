-- Draft 16x16 project sprites. Run from the repo root:
-- Aseprite.exe -b --script design/sprites/draft-sprites.lua
-- Writes design/sprites/<name>.aseprite and src/assets/sprites/<name>.png.

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

local root = app.fs.currentPath

for name, rows in pairs(SPRITES) do
  assert(#rows == 16, name .. ": expected 16 rows")
  local sprite = Sprite(16, 16, ColorMode.RGB)
  local palette = Palette(4)
  palette:setColor(0, Color { r = 0, g = 0, b = 0, a = 0 })
  palette:setColor(1, Color(INKS.k))
  palette:setColor(2, Color(INKS.g))
  palette:setColor(3, Color(INKS.r))
  sprite:setPalette(palette)

  local image = sprite.cels[1].image
  for y, row in ipairs(rows) do
    assert(#row == 16, name .. ": row " .. y .. " is not 16 wide")
    for x = 1, 16 do
      local ink = INKS[row:sub(x, x)]
      if ink then image:drawPixel(x - 1, y - 1, ink) end
    end
  end

  sprite:saveAs(app.fs.joinPath(root, "design", "sprites", name .. ".aseprite"))
  sprite:saveCopyAs(app.fs.joinPath(root, "src", "assets", "sprites", name .. ".png"))
  sprite:close()
end
