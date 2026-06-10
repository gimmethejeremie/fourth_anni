# Character Art

Place final visual-novel character art here and reference it from `src/data/guides.ts` through the app base path helper:

```ts
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

artSrc: publicAsset("characters/nhien-anh.png")
```

Current filenames:

- `nhien-anh.png`
- `demi.png`
- `an-chi.png`
- `lil-wayne.png`
- `mashiro.png`
- `ren-pham.png`
- `akatsuki.png`

Transparent PNG or WebP files work best because the visual-novel frame uses `object-fit: contain`.
