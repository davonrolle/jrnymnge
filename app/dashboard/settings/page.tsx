import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6 max-w-6xl">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="business-profile" className="space-y-4">
        {/*Small Screens */}
        <div className="grid gap-2 md:hidden">
        <TabsList className="flex flex-wrap justify-center gap-2">
          <TabsTrigger value="business-profile" className="flex-grow ">Business Profile</TabsTrigger>
          <TabsTrigger value="account" className="flex-grow ">Account</TabsTrigger>
          <TabsTrigger value="payment" className="flex-grow ">Payment & Pricing</TabsTrigger>
          </TabsList>
          <TabsList className="flex flex-wrap justify-center gap-2">
          <TabsTrigger value="notifications" className="flex-grow ">Notifications</TabsTrigger>
          <TabsTrigger value="roles" className="flex-grow ">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="regional" className="flex-grow ">Regional & Tax</TabsTrigger>
          </TabsList>
          <TabsList className="flex flex-wrap justify-center gap-2">
          <TabsTrigger value="integrations" className="flex-grow ">Integrations & API</TabsTrigger>
          <TabsTrigger value="data-privacy" className="flex-grow ">Data & Privacy</TabsTrigger>
        </TabsList>
        </div>
        {/*Large Screens*/}
        <div className="hidden gap-2 md:grid justify-center">
        <TabsList className="flex flex-wrap justify-start gap-2">
          <TabsTrigger value="business-profile" className="flex-grow ">Business Profile</TabsTrigger>
          <TabsTrigger value="account" className="flex-grow ">Account</TabsTrigger>
          <TabsTrigger value="payment" className="flex-grow ">Payment & Pricing</TabsTrigger>
          <TabsTrigger value="notifications" className="flex-grow ">Notifications</TabsTrigger>
          <TabsTrigger value="roles" className="flex-grow ">Roles & Permissions</TabsTrigger>
         
          </TabsList>
          <TabsList className="flex flex-wrap justify-center gap-2">
          <TabsTrigger value="regional" className="flex-grow ">Regional & Tax</TabsTrigger>
          <TabsTrigger value="integrations" className="flex-grow ">Integrations & API</TabsTrigger>
          <TabsTrigger value="data-privacy" className="flex-grow ">Data & Privacy</TabsTrigger>
        </TabsList>
        </div>

        <TabsContent value="business-profile">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
              <CardDescription>Manage your company details and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-logo">Company Logo</Label>
                  <Input id="company-logo" type="file" accept="image/*" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Textarea id="company-address" placeholder="Enter company address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Contact Phone</Label>
                  <Input id="company-phone" type="tel" placeholder="Enter contact phone" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Contact Email</Label>
                  <Input id="company-email" type="email" placeholder="Enter contact email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input id="company-website" type="url" placeholder="Enter website URL" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Business Hours</Label>
                <Textarea placeholder="Enter your business hours" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account-email">Email</Label>
                  <Input id="account-email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-phone">Phone</Label>
                  <Input id="account-phone" type="tel" placeholder="Enter your phone number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-password">Change Password</Label>
                <Input id="account-password" type="password" placeholder="Enter new password" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
              </div>
              <div className="space-y-2">
                <Label>Subscription Plan</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Plan</SelectItem>
                    <SelectItem value="pro">Pro Plan</SelectItem>
                    <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Update Account</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment & Pricing Configuration</CardTitle>
              <CardDescription>Manage payment integrations and pricing rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Payment Processor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment processor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="daily-rate">Daily Rate</Label>
                  <Input id="daily-rate" type="number" placeholder="Enter daily rate" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weekly-rate">Weekly Rate</Label>
                  <Input id="weekly-rate" type="number" placeholder="Enter weekly rate" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-rate">Monthly Rate</Label>
                  <Input id="monthly-rate" type="number" placeholder="Enter monthly rate" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
                <Textarea id="cancellation-policy" placeholder="Enter cancellation policy details" />
              </div>
              <Button>Save Pricing Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications & Communication</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email Notifications</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-new-booking" />
                    <Label htmlFor="email-new-booking">New Bookings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-cancellation" />
                    <Label htmlFor="email-cancellation">Cancellations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-changes" />
                    <Label htmlFor="email-changes">Reservation Changes</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>SMS Alerts</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="sms-pickup-reminder" />
                  <Label htmlFor="sms-pickup-reminder">Pickup Reminders</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>In-App Notifications</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="in-app-updates" />
                  <Label htmlFor="in-app-updates">Receive In-App Updates</Label>
                </div>
              </div>
              <Button>Update Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Manage team access and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-x-4">
                <Label>Team Management</Label>
                <Button variant="outline">Add Team Member</Button>
              </div>
              <div className="space-y-2">
                <Label>Roles</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="perm-bookings" />
                    <Label htmlFor="perm-bookings">Manage Bookings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="perm-fleet" />
                    <Label htmlFor="perm-fleet">Manage Fleet</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="perm-financials" />
                    <Label htmlFor="perm-financials">View Financials</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="perm-settings" />
                    <Label htmlFor="perm-settings">Modify Settings</Label>
                  </div>
                </div>
              </div>
              <Button>Save Role & Permissions</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional">
          <Card>
            <CardHeader>
              <CardTitle>Regional & Tax Settings</CardTitle>
              <CardDescription>Configure regional preferences and tax rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input id="tax-rate" type="number" placeholder="Enter tax rate" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-tax" />
                <Label htmlFor="show-tax">Show Tax as Separate Line Item</Label>
              </div>
              <Button>Save Regional Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations & API</CardTitle>
              <CardDescription>Manage third-party integrations and API access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Third-Party Integrations</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="integration-crm" />
                    <Label htmlFor="integration-crm">CRM Integration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="integration-accounting" />
                    <Label htmlFor="integration-accounting">Accounting Software</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="integration-calendar" />
                    <Label htmlFor="integration-calendar">Calendar Sync</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>API Access</Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input id="api-key" type="text" placeholder="Your API Key" readOnly className="flex-grow" />
                  <Button variant="outline">Generate New Key</Button>
                </div>
              </div>
              <Button>Save Integration Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-privacy">
          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy Settings</CardTitle>
              <CardDescription>Manage your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-x-4">
                <Label>Data Export</Label>
                <Button variant="outline">Export All Data</Button>
              </div>
              <div className="space-y-2">
                <Label>Data Retention</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="3years">3 Years</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-x-4 space-y-2">
                <Label>Account Deletion</Label>
                <Button variant="destructive">Request Account Deletion</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}