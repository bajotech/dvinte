import { Sequelize, Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        is_ativo: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    )
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })

    return this
  }

  // static associate(models) {
  //   this.belongsTo(models.Customer, {
  //     foreignKey: 'customer_id',
  //     as: 'customer',
  //   })
  // }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User
