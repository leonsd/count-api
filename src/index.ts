import { VisitController } from './controllers/VisitController';

const visitController = VisitController.getInstance();

export const increment = visitController.incrementVisits;
