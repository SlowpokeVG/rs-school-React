import { Gif } from '../types';

export default function csvCreate(gifs: Gif[]): string {
  const headers = [
    'ID',
    'Title',
    'Image URL',
    'Alt Text',
    'Type',
    'Import DateTime',
    'Source',
    'User Display Name',
    'User Avatar URL',
    'User Description',
    'User Username',
  ];

  const rows = gifs.map((gif) =>
    [
      gif.id || '',
      gif.title || '',
      gif.images?.fixed_height?.url || '',
      gif.images?.alt_text || '',
      gif.type || '',
      gif.import_datetime || '',
      gif.source || '',
      gif.user?.display_name || '',
      gif.user?.avatar_url || '',
      gif.user?.description || '',
      gif.user?.username || '',
    ]
      .map((value) => `"${(value || '').toString().replace(/"/g, '""')}"`)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}
