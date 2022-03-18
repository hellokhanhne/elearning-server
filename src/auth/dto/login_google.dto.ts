import { ApiProperty } from '@nestjs/swagger';

export class LoginGoogleDto {
  @ApiProperty({ example: 'EANCAJNCAJNACKSCMKA' })
  tokenId: string;
}
