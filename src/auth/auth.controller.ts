import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseEntity } from 'src/utils/ResponseEntity';
import { AuthService } from './auth.service';
import { LoginGoogleDto } from './dto/login_google.dto';
import { RequestDto } from './dto/request.dto';
import { RefreshTokenGuard } from './guards/rt-auth.guard';
import { ResLoginSuccess } from './types/tokens';

@ApiTags('/api/auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //  login with google
  @ApiOperation({ description: 'Login with google' })
  @ApiBody({
    schema: {
      example: { tokenId: 'EAKNCJNSNDSN' },
    },
  })
  @ApiResponse({
    schema: {
      example: {
        success: true,
        message: 'Login successfully !',
        data: {
          access_token: 'Ehabc',
          refresh_token: 'EAKAJVNA',
          user: {},
        },
      },
    },
  })
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
      .json(new ResponseEntity(true, 'Login successfully !', { data }));
  }

  // refresh access token
  @ApiOperation({
    description:
      'Get new access_token, please pass refresh_token to Authrize bearer !!! ',
  })
  @ApiResponse({
    schema: {
      example: {},
    },
  })
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh_token')
  async refreshToken(@Req() req: RequestDto, @Res() res: Response) {
    const data = await this.authService.refreshToken({
      email: req.user.email,
      id: req.user.id,
      role: req.user.role,
    });
    return res
      .status(HttpStatus.OK)
      .json(new ResponseEntity(true, 'Get token successfully', { data }));
  }
}
