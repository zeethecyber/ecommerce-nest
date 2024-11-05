import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsString()
  review: string;

  @IsNumber()
  rating: number;
}
