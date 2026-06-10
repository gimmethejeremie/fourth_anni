# Scrapbook Media

Place final scrapbook images and videos here and reference them from `src/data/scrapbook.ts` through the app base path helper if real media is added:

```ts
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

image: publicAsset("scrapbook/linh-lan-year-01.jpg"),
video: publicAsset("scrapbook/linh-lan-year-01.mp4"),
```

Recommended filename pattern:

- `linh-lan-year-01.jpg`
- `linh-lan-year-01.mp4`
- `lan-linh-year-01.jpg`
- `lan-linh-year-01.mp4`

Images render in the Polaroid frame, videos render with controls in the expanded lightbox. The current scrapbook data uses final anniversary copy as text beats until real media paths are added.
