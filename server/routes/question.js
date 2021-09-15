import { express } from '../config/packages';
import QuestionController from '../controllers/QuestionController';
import validator from '../utils/validationSchema';
import validate from '../middleware/validate';

const router = express.Router();

router.get('/',
    QuestionController.getQuestions);

router.get('/:id',
    validator('id'),
    validate,
    QuestionController.getQuestion);

router.post('/',
    validator('add_question'),
    validate,
    QuestionController.addQuestion);

router.patch('/:id',
    validator('update_question'),
    validate,
    QuestionController.updateQuestion);

router.delete('/:id',
    validator('id'),
    validate,
    QuestionController.deleteQuestion);

export default router;
