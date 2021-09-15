import { express } from '../config/packages';
import CategoryController from '../controllers/CategoryController';

const router = express.Router();

router.get('/',
    CategoryController.getCategories);

export default router;
