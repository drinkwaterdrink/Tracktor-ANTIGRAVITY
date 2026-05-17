import { parseJsonTrackerResponse } from '../dist/parser.js';
import { DEFAULT_TEMPLATE_HTML, renderTrackerTemplate } from '../dist/shared.js';

const parsed = parseJsonTrackerResponse('```json\n{"time":"noon",}\n```');
if (parsed.data.time !== 'noon') {
  throw new Error('parser failed');
}

const html = renderTrackerTemplate(DEFAULT_TEMPLATE_HTML, {
  time: 'noon',
  location: 'Cafe',
  mood: 'calm',
  situation: 'Talking',
  charactersPresent: ['A'],
  characters: [
    {
      name: 'A',
      appearance: 'neat',
      outfit: 'coat',
      posture: 'standing',
      notableState: 'alert',
    },
  ],
  openThreads: ['plan'],
});

if (!html.includes('Cafe') || html.includes('<script')) {
  throw new Error('template failed');
}

console.log('smoke ok');
