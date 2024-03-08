import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private service = new MatchService(),
  ) {}

  async findAllMatches(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.service.findAll();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async findAllMatchesByStatus(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress !== 'true' && inProgress !== 'false') {
      return res.status(400).json({ message: 'Invalid query, expected "true" or "false"' });
    }

    const { status, data } = await this.service.findAllByStatus(inProgress);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
