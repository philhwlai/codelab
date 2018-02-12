

ffmpeg -i mkmermaid.mov -vf palettegen mkmermaid-palette.png


ffmpeg -i mkmermaid.mov -i mkmermaid-palette.png -vf scale=640:360 -y mkmermaid360.gif

ffmpeg -i mkmermaid.mov -i mkmermaid-palette.png -vf scale=960:540 -y mkmermaid540.gif


ffmpeg -i mkmermaid.mov -filter:v "crop=720:1080:600:0" -c:a copy out.mp4



ffmpeg -i out.mp4 -i mkmermaid-palette.png -vf scale=480:720 -y mkmermaid720.gif


ffmpeg -i plane_gif.mov -vf palettegen palette.png

ffmpeg -i plane_gif.mov -i palette.png -vf scale=640:360 -y plane_gif360.gif
