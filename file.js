const contentful = require('contentful')

const client = contentful.createClient({
  space: 'dcn8op551vj3',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'mY7n61wwaoKVtIX9McrL2xwey4CLEY4eFOljqApN8GQ'
})

client.getEntry('2zMkMQ6otlGboUIP9CqwD1')
  .then((entry) => console.log(entry.fields.grade1.content[0].content[0]
    .value
  ))
  .catch(console.error)

/*   // output : 
  [
    {
      nodeType: 'text',
      value: 'الدرس الاول للصف الاول\nبعنوان الضرب و القسمة\nengilish',
      marks: [],
      data: {}
    }
  ] */