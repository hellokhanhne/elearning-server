import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseEntity } from 'src/utils/ResponseEntity';
import { AuthService } from './auth.service';
import { LoginGoogleDto } from './dto/login_google.dto';
import { RequestDto } from './dto/request.dto';
import { AccessTokenGuard } from './guards/at-auth.guard';
import { RefreshTokenGuard } from './guards/rt-auth.guard';
import { ResLoginSuccess } from './types/tokens';

@ApiTags('/api/auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //  login with google
  @ApiOperation({ description: 'Login with google' })
  @Post('/google/login')
  async loginWithGoogle(@Body() body: LoginGoogleDto, @Res() res: Response) {
    const data: ResLoginSuccess = await this.authService.loginWithGoogle(
      body.tokenId,
    );

    if (!data) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(new ResponseEntity(false, "Can't authenticate !!!"));
    }
    return res
      .status(200)
      .json(new ResponseEntity(true, 'Login successfully !', data));
  }

  // logout
  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  async logout(@Req() req: RequestDto, @Res() res: Response) {
    await this.authService.logout(req.user.email);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseEntity(true, 'Logout successfully'));
  }

  // refresh access token
  @ApiOperation({
    description:
      'Get new access_token, please pass refresh_token to Authrize bearer !!! ',
  })
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @Post('/refresh_token')
  async refreshToken(@Req() req: RequestDto, @Res() res: Response) {
    const data = await this.authService.refreshToken({
      email: req.user.email,
      id: req.user.id,
      role: req.user.role,
    });
    return res
      .status(HttpStatus.OK)
      .json(new ResponseEntity(true, 'Get token successfully', data));
  }
}
