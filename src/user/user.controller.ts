import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/create')
    async createPost(@Res() res, @Body() createUserDTO: CreateUserDTO) {

        const user = await this.userService.createUser(createUserDTO);

        return res.status(HttpStatus.OK).json({
            message: 'Created User',
            user: user
        });
    }

    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();

        return res.status(HttpStatus.OK).json({
            users: users
        });
    }

    @Get('/:userId')
    async getUser(@Res() res, @Param('userId') userId) {
        const user = await this.userService.getUser(userId);

        if (!user) throw new NotFoundException('User not found');

        return res.status(HttpStatus.OK).json({
            user: user
        });
    }

    @Delete('/delete/:userId')
    async deleteUser(@Res() res, @Param('userId') userId) {
        const user = await this.userService.deleteUser(userId);

        if (!user) throw new NotFoundException('User not found');

        return res.status(HttpStatus.OK).json({
            message: 'User Deleted',
            user: user
        });
    }

    @Put('update/:userId')
    async updateUser(@Res() res, @Body() createUserDTO: CreateUserDTO, @Param('userId') userId) {
        const user = await this.userService.updateUser(userId, createUserDTO);

        if (!user) throw new NotFoundException('User not found');

        return res.status(HttpStatus.OK).json({
            message: 'User Updated',
            user: user
        });
    }
}
