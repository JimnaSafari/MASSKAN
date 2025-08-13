Bundled images
==============

Use this folder for images imported in components so Vite can hash/cache-optimize them.

How to use in a component:

```tsx
import heroImg from '@/assets/images/hero.jpg';

export default function Example() {
  return <img src={heroImg} alt="Hero" />
}
```

CSS background with import:

```tsx
const url = new URL('@/assets/images/texture.png', import.meta.url).href;
<div style={{ backgroundImage: `url(${url})` }} />
```

Good for:
- Component-specific assets that benefit from build-time optimizations.


