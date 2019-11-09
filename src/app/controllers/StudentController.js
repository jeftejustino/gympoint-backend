import * as Yup from 'yup';
import Sequelize from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { limit = 1, q = '' } = req.query;
    const students = await Student.findAll({
      offset: (limit - 1) * 20,
      limit: 20,
      order: ['created_at'],
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      where: {
        name: { [Sequelize.Op.substring]: q },
      },
    });
    return res.json(students);
  }

  async store(req, res) {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.string().required(),
      height: Yup.string().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails!' });
    }

    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const { id, name, age, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
