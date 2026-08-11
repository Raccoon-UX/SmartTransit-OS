import { plannerService } from '../services/plannerService.js';

export const plannerController = {
  /**
   * POST /api/v1/planner/multimodal
   * PUBLIC — Zero Authentication Required
   */
  async planMultimodalJourney(req, res, next) {
    try {
      const { origin, destination, preferences, from, to, preference } = req.body;

      const rawOrigin = origin || from;
      const rawDestination = destination || to;
      const rawPref = preferences?.priority || preference || 'BEST_OVERALL';

      if (!rawOrigin || !rawDestination) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Both origin and destination are required to calculate a transit journey.',
          },
        });
      }

      // Check if string is empty
      const originName = typeof rawOrigin === 'string' ? rawOrigin.trim() : rawOrigin.name?.trim();
      const destName = typeof rawDestination === 'string' ? rawDestination.trim() : rawDestination.name?.trim();

      if (!originName || !destName) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_LOCATION_INPUT',
            message: 'Origin and destination must provide valid location names or coordinates.',
          },
        });
      }

      const journeyResult = await plannerService.planJourney({
        origin: rawOrigin,
        destination: rawDestination,
        preference: rawPref,
      });

      res.status(200).json({
        success: true,
        data: journeyResult,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default plannerController;
