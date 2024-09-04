import { ByteArkPlayerSource } from 'byteark-player-angular';

export interface IVideo extends ByteArkPlayerSource {
  title: string;
  poster: string;
  description: string;
}

export const videos: IVideo[] = [
  {
    videoId: '1',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type: 'video/mp4',
    title: 'Big Buck Bunny',
    poster:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
    description:
      "Big Buck Bunny (code-named Project Peach) is a 2008 short computer-animated comedy film featuring animals of the forest, made by the Blender Institute, part of the Blender Foundation. Like the foundation's previous film, Elephants Dream, the film was made using Blender, a free and open-source software application for 3D computer modeling and animation developed by the same foundation. Unlike that earlier project, the tone and visuals departed from a cryptic story and dark visuals to one of comedy, cartoons, and light-heartedness.",
  },
  {
    videoId: '2',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    type: 'application/x-mpegURL',
    title: 'Sintel',
    poster: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
    description:
      'Sintel, code-named Project Durian during production, is a 2010 animated fantasy short film. It was the third Blender "open movie". It was produced by Ton Roosendaal, chairman of the Blender Foundation, written by Esther Wouda, directed by Colin Levy, at the time an artist at Pixar and art direction by David Revoy, who is known for Pepper&Carrot an open source webcomic series.[3] It was made at the Blender Institute, part of the Blender Foundation. The plot follows the character, Sintel, who is tracking down her pet Scales, a dragon. Just like the other Blender "open movies," the film was made using Blender, a free and open source software application for animation, created and supported by the Blender Foundation.',
  },
];
