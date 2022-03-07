import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginGoogleDto } from './dto/login_google.dto';
import { RequestDto } from './dto/request.dto';
import { RefreshTokenGuard } from './guards/rt-auth.guard';
import { Tokens } from './types/tokens';

@ApiTags('/api/auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ description: 'Login with google' })
  @Post('/google/login')
  async loginWithGoogle(@Body() body: LoginGoogleDto, @Res() res: Response) {
    const data: Tokens = await this.authService.loginWithGoogle(body.tokenId);
    if (!data)
      return res.status(403).json({ message: 'Can not authenticate !!!' });
    return res.status(200).json({ data });
  }
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh_token')
  async refreshToken(@Req() req: RequestDto) {
    return await this.authService.refreshToken({
      email: req.user.email,
      id: req.user.id,
      role: req.user.role,
    });
  }
}
