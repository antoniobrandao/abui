import { Label } from "@/registry/abui/ui/label"
import { Input } from "@/registry/abui/ui/input"
import { Textarea } from "@/registry/abui/ui/textarea"
import { Button } from "@/registry/abui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/abui/ui/card"

export function ContactForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          We would love to hear from you. Please fill out the form below and we
          will get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email" />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Message" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}
