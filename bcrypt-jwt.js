import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

(async () => {
  const password = '123456';
  const passwordHash = await bcrypt.hash(password, 12);

  console.log(passwordHash);
})();

(async () => {
  const JWT_SECRET = 'secret';

  const token = jwt.sign(
    {
      userId: '123',
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  console.log(token);
})();
