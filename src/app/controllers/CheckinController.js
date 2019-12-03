import { endOfDay, startOfDay, subDays } from 'date-fns';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const student_id = req.params.id;
    const { page = 1 } = req.query;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id },
      offset: (page - 1) * 20,
      limit: 20,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const student_id = req.params.id;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    /**
     * Checar quantidade de checkins
     * nos ultimos 7 dias
     */
    const endDate = new Date();
    const startDate = subDays(endDate, 7);
    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(startDate), endOfDay(endDate)],
        },
      },
    });

    if (checkins.count >= 5) {
      return res.status(401).json({ error: 'Checkins limit reached' });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}
export default new CheckinController();
