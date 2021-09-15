import { express } from '../config/packages';
import QuestionController from '../controllers/QuestionController';

const router = express.Router();

router.get('/',
    QuestionController.getQuestions);

router.post('/',
    QuestionController.addQuestion);

export default router;
