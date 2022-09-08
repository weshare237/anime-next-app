export default {
  name: 'saison',
  title: 'Saison',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'serie',
      title: 'Serie',
      type: 'reference',
      to: [{ type: 'movie' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
