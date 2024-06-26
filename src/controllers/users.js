import bcrypt from "bcrypt";
import User from "../models/userSchema.js";

export default class Users {
  static async getAllUsers(req, res) {
    try {
      // db.query('SELECT id, name, email, phone_number, photo, updated_at, created_at FROM users')
      const findAllUsers = await User.find();
      const countAllUsers = await findAllUsers.length;
      res.status(200).json({
        status: "success",
        message: `${countAllUsers} user(s) found`,
        findAllUsers,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error. Please try again later",
        error: error.message,
      });
    }
  }

  // static getOneUser(req, res) {
  //   db.query('SELECT id, name, email, phone_number, photo, updated_at, created_at FROM users WHERE id=$1', [req.params.id])
  //     .then((firstResult) => {
  //       if (firstResult.rowCount < 1) {
  //         res.status(404).json({
  //           status: 'error',
  //           message: 'User was not found',
  //         });
  //       } else {
  //         res.status(200).json({
  //           status: 'success',
  //           message: 'User found',
  //           user: firstResult.rows[0],
  //         });
  //       }
  //     })
  //     .catch(() => {
  //       res.status(500).json({
  //         status: 'error',
  //         message: 'Internal server error. Please try again later',
  //       });
  //     });
  // }

  // static updateUserProfile(req, res) {
  //   const { name, phoneNumber } = req.body;
  //   db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
  //     .then((resultOne) => {
  //       if(resultOne.rowCount < 1) {
  //         res.status(404).json({
  //           status: 'User was not found',
  //         });
  //       } else {
  //         if (req.params.id !== req.authData.user.id) {
  //           res.status(401).json({
  //             status: 'success',
  //             message: 'You cannot update another user\'s profile',
  //           })
  //         } else {
  //           let updateQuery = 'UPDATE users SET updated_at=$1,';
  //           updateQuery += name !== undefined ? ' name=$2' : '';
  //           updateQuery += phoneNumber !== undefined ? name !== undefined ? ', phone_number=$3' : ' phone_number=$2': '';
  //           updateQuery += name !== undefined && phoneNumber !== undefined ? ' WHERE id=$4' : ' WHERE id=$3';
  //           updateQuery += ' RETURNING updated_at,';
  //           updateQuery += name !== undefined && phoneNumber !== undefined ? ' name, phone_number' : name !== undefined ? ' name' : phoneNumber !== undefined ? ' phone_number' : '' ;

  //           const updateData = name !== undefined && phoneNumber !== undefined ? [name, phoneNumber] : name !== undefined ? [name] : phoneNumber !== undefined ? [phoneNumber] : '';

  //           db.query(updateQuery, [new Date().toISOString(), ...updateData, req.authData.user.id])
  //             .then((resultTwo) => {
  //               res.status(200).json({
  //                 status: 'succes',
  //                 message: 'Profile updated successfully',
  //                 user: resultTwo.rows[0],
  //               });
  //             })
  //             .catch(() => {
  //               res.status(500).json({
  //                 status: 'error',
  //                 message: 'Internal server error. Please try again later',
  //               });
  //             })
  //         }
  //       }
  //     })
  //     .catch(() => {
  //       res.status(500).json({
  //         status: 'error',
  //         message: 'Internal server error. Please try again later',
  //       });
  //     })
  // }

  // static updateUserPassword(req, res) {
  //   const { password } = req.body;
  //   db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
  //     .then((resultOne) => {
  //       if (resultOne.rowCount < 1) {
  //         res.status(404).json({
  //           status: 'error',
  //           message: 'User was not found',
  //         });
  //       } else {
  //         if (req.params.id !== req.authData.user.id) {
  //           res.status(401).json({
  //             status: 'success',
  //             message: 'You cannot update another user\'s profile',
  //           })
  //         } else {
  //           db.query('UPDATE users SET password=$1, updated_at=$2 WHERE id=$3', [bcrypt.hashSync(password, 8), new Date().toISOString(), req.params.id])
  //             .then(() => {
  //               res.status(200).json({
  //                 status: 'success',
  //                 message: 'Password updated successfully',
  //               })
  //             })
  //             .catch(() => {
  //               res.status(500).json({
  //                 status: 'error',
  //                 message: 'Internal server error. Please try again later',
  //               });
  //             })
  //         }
  //       }
  //     })
  //     .catch(() => {
  //       res.status(500).json({
  //         status: 'error',
  //         message: 'Internal server error. Please try again later',
  //       });
  //     })
  // }

  // static updateUserPhoto(req, res) {
  //   const { photo } = req.body;
  //   db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
  //     .then((resultOne) => {
  //       if (resultOne.rowCount < 1) {
  //         res.status(404).json({
  //           status: 'error',
  //           message: 'User was not found',
  //         });
  //       } else {
  //         if (req.params.id !== req.authData.user.id) {
  //           res.status(401).json({
  //             status: 'success',
  //             message: 'You cannot update another user\'s profile',
  //           })
  //         } else {
  //           db.query('UPDATE users SET photo=$1, updated_at=$2 WHERE id=$3 RETURNING photo', [photo, new Date().toISOString(), req.authData.user.id])
  //             .then((resultTwo) => {
  //               res.status(200).json({
  //                 status: 'success',
  //                 message: 'Profile photo updated successfully!',
  //                 user: resultTwo.rows[0],
  //               })
  //             })
  //             .catch(() => {
  //               res.status(500).json({
  //                 status: 'error',
  //                 message: 'Internal server error. Please try again later',
  //               });
  //             })
  //         }
  //       }
  //     })
  //     .catch(() => {
  //       res.status(500).json({
  //         status: 'error',
  //         message: 'Internal server error. Please try again later',
  //       });
  //     })
  // }
}
