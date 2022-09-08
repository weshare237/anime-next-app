export default {
  name: 'episode',
  title: 'Episode',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'saison',
      title: 'Saison',
      type: 'reference',
      to: [{ type: 'saison' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'string',
    },
  ],
}
