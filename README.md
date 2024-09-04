# ByteArk Player Container for Angular

## Getting Started

This guide will help you set up and run the ByteArk Player Container for Angular.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the project:**

   ```sh
   git clone git@github.com:maxmurr/byteark-player-angular-demo.git
   cd byteark-player-angular-demo
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the application:**

   ```sh
   npm run start
   # or
   yarn start
   # or
   pnpm start
   # or
   bun start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:4200
   ```

### Usage

To use the ByteArk Player Container in your Angular application, follow these steps:

1. **Import the ByteArk Player Container component:**

   ```typescript:projects/example/src/app/sample-blog/sample-blog.component.ts
   startLine: 1
   endLine: 14
   ```

2. **Add the component to your template:**

   ```html:projects/example/src/app/sample-blog/sample-blog.component.html
   startLine: 1
   endLine: 21
   ```

3. **Configure the player options:**

   ```typescript:projects/example/src/app/sample-blog/sample-blog.component.ts
   startLine: 15
   endLine: 30
   ```

### Customization

You can customize the player by passing different options to the `ByteArkPlayerContainer` component. Here are some of the available options:

- `fluid`: Boolean to enable fluid layout.
- `autoplay`: Boolean to enable autoplay.
- `aspectRatio`: String to set the aspect ratio (e.g., '16:9').
- `poster`: URL of the poster image.
- `sources`: Array of video sources.

For a full list of options, refer to the `ByteArkPlayerContainerProps` interface in the codebase.

### Error Handling

The ByteArk Player Container provides several hooks for error handling:

- `onPlayerLoadError`
- `onPlayerSetupError`

You can use these hooks to handle errors gracefully in your application.

### Example

Here is a complete example of how to use the ByteArk Player Container in an Angular component:

```typescript
import { Component } from "@angular/core";
import { ByteArkPlayerContainer, type ByteArkPlayerContainerProps } from "byteark-player-angular";
import { videos } from "../videos";
import { SiteHeaderComponent } from "../../components/site-header.component";

@Component({
  selector: "app-sample-blog",
  standalone: true,
  imports: [SiteHeaderComponent, ByteArkPlayerContainer],
  templateUrl: "./sample-blog.component.html",
})
export class SampleBlogComponent {
  title = "ByteArk Player Container | Sample Blog";
  options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    aspectRatio: "16:9",
    poster: videos[0].poster,
    sources: [
      {
        src: videos[0].src,
        type: videos[0].type,
        title: videos[0].title,
      },
    ],
  };
}
```

### Contributing

We welcome contributions! Please read our [contributing guidelines](CON
