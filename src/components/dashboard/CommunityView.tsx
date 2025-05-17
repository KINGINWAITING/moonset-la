
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, Twitter, Github, Discord, Globe } from "lucide-react";

export const CommunityView = () => {
  const socialLinks = [
    { name: "Twitter", icon: Twitter, url: "https://twitter.com", color: "bg-blue-500" },
    { name: "Discord", icon: Discord, url: "https://discord.com", color: "bg-indigo-500" },
    { name: "Github", icon: Github, url: "https://github.com", color: "bg-gray-700" },
    { name: "Website", icon: Globe, url: "https://example.com", color: "bg-green-500" },
  ];

  const communityEvents = [
    {
      title: "Monthly AMA Session",
      date: "May 25, 2025",
      time: "18:00 UTC",
      description: "Join our monthly Ask Me Anything session with the core team to discuss recent developments and future plans.",
    },
    {
      title: "Community Call",
      date: "May 30, 2025",
      time: "16:00 UTC",
      description: "Regular community call to discuss ecosystem growth, marketing initiatives, and community proposals.",
    },
    {
      title: "Developer Workshop",
      date: "June 5, 2025",
      time: "15:00 UTC",
      description: "Learn how to build on our platform with this hands-on developer workshop led by our lead engineers.",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Community <span className="text-primary">Hub</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Social Links */}
        <Card className="bg-[#121212] border-gray-800">
          <CardHeader>
            <CardTitle>Connect With Us</CardTitle>
            <CardDescription>Join our vibrant community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button 
                  variant="outline" 
                  className="w-full justify-between hover:border-primary transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${link.color}`}>
                      <link.icon className="h-4 w-4 text-white" />
                    </div>
                    {link.name}
                  </div>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
            ))}
          </CardContent>
        </Card>

        {/* Community Events */}
        <Card className="bg-[#121212] border-gray-800 md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Don't miss out on community events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityEvents.map((event, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Add to Calendar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400">{event.description}</p>
                  {index < communityEvents.length - 1 && (
                    <Separator className="my-4 bg-gray-800" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Governance Section */}
        <Card className="md:col-span-2 bg-[#121212] border-gray-800">
          <CardHeader>
            <CardTitle>Governance</CardTitle>
            <CardDescription>Have your say in the project's future</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                MOONSET token holders can vote on important protocol decisions and contribute to the 
                future direction of the project. Governance proposals are submitted, discussed, and 
                voted on by the community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button>View Active Proposals</Button>
                <Button variant="outline">Submit a Proposal</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Stats */}
        <Card className="bg-[#121212] border-gray-800">
          <CardHeader>
            <CardTitle>Community Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Token Holders</p>
                <p className="text-2xl font-bold">24,821</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Discord Members</p>
                <p className="text-2xl font-bold">12,450</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Twitter Followers</p>
                <p className="text-2xl font-bold">45,200</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Governance Proposals</p>
                <p className="text-2xl font-bold">37</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
