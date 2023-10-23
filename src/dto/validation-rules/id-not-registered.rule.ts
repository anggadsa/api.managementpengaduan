import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { PengaduanMasyarakatService } from '../../controller/pengaduan-masyarakat/pengaduan-masyarakat.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@ValidatorConstraint({ name: 'IdIsExist', async: true })
@Injectable()
export class IsIdNotRegistered implements ValidatorConstraintInterface {
  constructor(
    private readonly pengaduanMasyarakatService: PengaduanMasyarakatService,
  ) {}
  validate(id: string | undefined) {
    return this.pengaduanMasyarakatService
      .getPengaduanMasyarakat(id)
      .then((data) => {
        if (data) {
          throw new UnprocessableEntityException('Id already exists');
        } else {
          return true;
        }
      });
  }
}

export function IdIsExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsIdNotRegistered,
    });
  };
}
