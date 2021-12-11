import * as yup from 'yup';

const CommentsSchema = yup.object().shape({
  content: yup.string().required('Address is required').max(512, 'Maximum 512 characters'),
});

export default CommentsSchema;