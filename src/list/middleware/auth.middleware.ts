import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'; 
import { Request, Response, NextFunction } from 'express';  
import { X_AUTH_TOKEN } from 'src/constants/constants';
import { UserService } from '../list.service';
import { User } from 'src/models/user.schema';

@Injectable() 
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers[X_AUTH_TOKEN];

    if (!authToken || typeof authToken !== 'string') throw new BadRequestException()

    const user = await this.userService.listUser(authToken);

    if (!user) throw new UnauthorizedException();

    next();   
  } 
}