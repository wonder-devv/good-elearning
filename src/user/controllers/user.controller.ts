import { ApiOkResponsePaginated } from '@/common/decorators';
import {
  CourseDto,
  EnrolledCourseDto,
  QueryDto,
  UserDto,
  UserMetaDto,
  UserUpdateDto,
} from '@/core/models';
import { SecurityContextService } from '@/core/security/security-context.service';
import {
  COURSE_BOOKMARK_SERVICE,
  COURSE_ENROLLMENT_SERVICE,
  COURSE_REVIEW_SERVICE,
  CourseBookmarkService,
  CourseEnrollmentService,
  CourseReviewService,
  USER_SERVICE,
  UserService,
} from '@/core/services';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Res,
  SerializeOptions,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('User')
@Controller('/content/user')
export class UserController {
  constructor(
    private security: SecurityContextService,
    @Inject(USER_SERVICE)
    private userService: UserService,
    @Inject(COURSE_REVIEW_SERVICE)
    private courseReviewService: CourseReviewService,
    @Inject(COURSE_ENROLLMENT_SERVICE)
    private courseEnrollmentService: CourseEnrollmentService,
    @Inject(COURSE_BOOKMARK_SERVICE)
    private courseBookmarkService: CourseBookmarkService,
  ) {}

  @SerializeOptions({ groups: ['detail'] })
  @Get()
  getUser(): UserDto {
    return this.security.getAuthenticatedUser();
  }

  @Put()
  async update(@Body() values: UserUpdateDto): Promise<UserDto> {
    const user = this.security.getAuthenticatedUser();
    const updated = await this.userService.update({
      ...values,
      id: user.id,
    });

    return updated as UserDto;
  }

  @Get('meta')
  async getUserMeta(): Promise<UserMetaDto> {
    const user = this.security.getAuthenticatedUser();
    const enrollmentCount = await this.courseEnrollmentService.countByUser(user.id);
    const bookmarkCount = await this.courseBookmarkService.countByUser(user.id);

    return new UserMetaDto({ enrollmentCount, bookmarkCount });
  }

  @ApiOkResponsePaginated(EnrolledCourseDto)
  @Get('enrollments')
  async getEnrollments(@Query() query: QueryDto) {
    const user = this.security.getAuthenticatedUser();
    return await this.courseEnrollmentService.findByUserId(user.id, query);
  }

  @ApiOkResponsePaginated(CourseDto)
  @Get('bookmarks')
  async getBookmarks(@Query() query: QueryDto) {
    const user = this.security.getAuthenticatedUser();
    return await this.courseBookmarkService.findByUserId(user.id, query);
  }

  @Get('reviews/:courseId/me')
  async getCourseReviewByUser(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Res({ passthrough: true }) resp: Response,
  ) {
    const user = this.security.getAuthenticatedUser();
    const result = await this.courseReviewService.findByUserIdAndCourseId(
      user.id,
      courseId,
    );

    if (!result) {
      resp.status(HttpStatus.NO_CONTENT);
    }

    return result;
  }
}
