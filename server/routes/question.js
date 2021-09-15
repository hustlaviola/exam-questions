import { express } from '../config/packages';
import QuestionController from '../controllers/QuestionController';

const router = express.Router();

router.get('/',
    QuestionController.getQuestions);

router.get('/:id',
    QuestionController.getQuestion);

router.post('/',
    QuestionController.addQuestion);

router.patch('/:id',
    QuestionController.updateQuestion);

router.delete('/:id',
    QuestionController.deleteQuestion);

export default router;
