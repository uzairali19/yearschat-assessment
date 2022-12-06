const yup = require('yup');

const messageSchema = yup.object().shape({
    text: yup
    .string()
    .required('Text is required')
    .min(1, 'Text too short!')
    .max(100, 'Text too long!'),
});