interface CredentialsLogin {
  email: string;
  password: string;
}
interface Credentials {
  email: string;
  password: string;
  fullName: string;
}
interface BookingData {
  date: string;
  guests: number;
  tripId: string;
  userId: string;
}
enum ButtonType {
	button = "button",
	submit = "submit",
	reset = "reset",
}

enum BookingLevel {
  easy = "easy",
  moderate = "moderate",
  difficult = "difficult",
}

interface Trip {
  id: string;
  createdAt: string;
  description: string;
  duration: number;
  image: string;
  level: BookingLevel;
  price: number;
  title: string;
}

export type { Credentials, BookingData, CredentialsLogin, Trip, BookingLevel };
export { ButtonType}
