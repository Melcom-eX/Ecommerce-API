import { Request, Response } from "express"; // Import Request and Response types
import userService from "../user/user.service"; // Ensure the userService is exported correctly
import emailService from "../../utils/email"; // Ensure the emailService is exported correctly
import { sendOTPToUser } from "../../utils/otp";
import { CreateUserResponse, UserServiceResponse } from "../user/user.response";
import cartController from "../cart/cart.controller";

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const response = await userService.loginUser(email, password);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async signup(req: Request, res: Response): Promise<Response> {
    const { username, password, email, role } = req.body;

    try {
      const response = await userService.createUser(
        username,
        password,
        email,
        role
      );

      if (response.error) {
        return res.status(response.statusCode).json(response);
      }

      const userId = (response as CreateUserResponse).data.id;

      // Await the OTP generation and sending process
      const otp = await sendOTPToUser(userId); // Now resolves to a string
      if (!otp) {
        // Handle the error case where OTP could not be sent
        return res.status(500).json({ message: "Failed to send OTP" });
      }

      // Prepare the email data
      const data = {
        subject: "Pickit validation",
        username: username,
        OTP: otp, // This is now a string
      };

      // Await the email sending process
      await emailService.sendEmailWithTemplate(email, data);

      // logger.log("signup request completed ")

      // Return successful response
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Signup error:", err);
      // logger.log("error occured whiile proccsing sign up requset server error ")
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  //validate otp
  async validateOTP(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { OTP } = req.body;
    try {
      const response: UserServiceResponse | any = await userService.validateOTP(
        id,
        OTP
      );
      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Validate OTP error:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  async resendOTP(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { email } = req.body;
    try {
      const otp = await sendOTPToUser(id); // Generate OTP

      if (!otp) {
        return res.status(500).json({ message: "Failed to send OTP" });
      }

      const data = {
        subject: "Resent OTP",
        username: email,
        OTP: otp, // Send OTP to the user's email
      };

      await emailService.sendEmailWithTemplate(email, data); // Send email with OTP

      return res.status(200).json({ message: "OTP sent to User" });
    } catch (error) {
      console.error("Reset Password OTP error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async ResetPassword(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { email } = req.body;
    try {
      const otp = await sendOTPToUser(id); // Generate OTP

      if (!otp) {
        return res.status(500).json({ message: "Failed to send OTP" });
      }

      const data = {
        subject: "Reset Your Password",
        OTP: otp, // Send OTP to the user's email
      };

      await emailService.sendResetPasswordEmail(email, data); // Send email with OTP

      return res.status(200).json({ message: "OTP sent to User" });
    } catch (error) {
      console.error("Reset Password OTP error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async confirmResetPassword(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { OTP, newPassword } = req.body; // Receive OTP, user id, and new password

    try {
      // Step 1: Validate OTP
      const isValidOTP = await userService.validateOTP(id, OTP); // Validate OTP using the service

      if (!isValidOTP) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      // Step 2: If OTP is valid, update the password
      const passwordUpdated = await userService.updatePassword(id, newPassword); // Update user's password

      if (!passwordUpdated) {
        return res.status(500).json({ message: "Failed to update password" });
      }

      return res.status(200).json({ message: "Password successfully updated" });
    } catch (error) {
      console.error("Confirm Reset Password error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async newsletter(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    try {
      const data = await userService.sendNewsLetter(email);
      if (!data) {
        return res.status(500).json({ message: "Failed to send Newsletter" });
      }
      await emailService.sendNewsLetterEmail(email);
      return res.status(data.statusCode).send(data);
    } catch (error) {
      console.error("Newsletter error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new AuthController(); // Use ES module syntax to export
