import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Circle, 
  ChevronDown, 
  ChevronRight,
  HelpCircle,
  Info,
  AlertTriangle,
  ExternalLink,
  Users,
  Rocket,
  Target,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/design-system/components/base';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

/**
 * Timeline phase interface
 */
interface TimelinePhase {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  details?: string[];
  icon: React.ReactNode;
}

/**
 * FAQ item interface
 */
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'tokenomics' | 'security';
  tags?: string[];
}

interface IDOInfoSectionsProps {
  timeline?: TimelinePhase[];
  faqs?: FAQItem[];
  className?: string;
}

/**
 * Default timeline phases for MOONSET IDO
 */
const defaultTimeline: TimelinePhase[] = [
  {
    id: 'announcement',
    title: 'IDO Announcement',
    description: 'Official announcement and whitepaper release',
    date: 'Nov 15, 2024',
    status: 'completed',
    details: [
      'Whitepaper published',
      'Community announcement',
      'Social media campaign launch',
      'Partnership announcements'
    ],
    icon: <Rocket className="h-5 w-5" />
  },
  {
    id: 'preparation',
    title: 'Pre-IDO Preparation',
    description: 'Smart contract deployment and security audits',
    date: 'Dec 1, 2024',
    status: 'completed',
    details: [
      'Smart contract deployment',
      'Security audit completion',
      'Liquidity pool setup',
      'KYC/AML procedures'
    ],
    icon: <Shield className="h-5 w-5" />
  },
  {
    id: 'ido-launch',
    title: 'IDO Launch',
    description: 'Public sale begins on Uniswap',
    date: 'Dec 15, 2024',
    status: 'current',
    details: [
      'Public sale opens',
      'Uniswap integration live',
      'Real-time progress tracking',
      '24/7 community support'
    ],
    icon: <Target className="h-5 w-5" />
  },
  {
    id: 'trading',
    title: 'Trading Begins',
    description: 'Token trading opens on major exchanges',
    date: 'Jan 15, 2025',
    status: 'upcoming',
    details: [
      'DEX trading enabled',
      'CEX listings planned',
      'Liquidity incentives',
      'Market making support'
    ],
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem Launch',
    description: 'Platform features and governance activation',
    date: 'Feb 1, 2025',
    status: 'upcoming',
    details: [
      'Governance portal launch',
      'Staking rewards begin',
      'Platform features unlock',
      'Community voting starts'
    ],
    icon: <CheckCircle className="h-5 w-5" />
  }
];

/**
 * Default FAQ items
 */
const defaultFAQs: FAQItem[] = [
  {
    id: 'what-is-moonset',
    question: 'What is MOONSET token?',
    answer: 'MOONSET is a utility token that powers our decentralized platform, providing governance rights, staking rewards, and access to premium features. It\'s designed to create value for long-term holders while supporting the ecosystem\'s growth.',
    category: 'general',
    tags: ['utility', 'governance', 'staking']
  },
  {
    id: 'how-to-participate',
    question: 'How can I participate in the IDO?',
    answer: 'To participate, you need to connect a Web3 wallet (like MetaMask), have ETH for the purchase and gas fees, and use our integrated Uniswap widget to swap ETH for MOONSET tokens. The process is simple and guided step-by-step.',
    category: 'general',
    tags: ['participation', 'wallet', 'uniswap']
  },
  {
    id: 'minimum-purchase',
    question: 'Is there a minimum purchase amount?',
    answer: 'There is no minimum purchase amount for the IDO. However, please consider gas fees when making smaller purchases, as they might represent a significant portion of your transaction cost.',
    category: 'general',
    tags: ['minimum', 'gas fees']
  },
  {
    id: 'token-utility',
    question: 'What can I do with MOONSET tokens?',
    answer: 'MOONSET tokens provide multiple utilities: governance voting rights, staking for rewards, access to premium platform features, reduced fees, and participation in exclusive events and airdrops.',
    category: 'tokenomics',
    tags: ['utility', 'governance', 'staking', 'rewards']
  },
  {
    id: 'vesting-schedule',
    question: 'Are there any vesting periods for IDO participants?',
    answer: 'No, tokens purchased during the IDO have no vesting period and are immediately available for trading, staking, or governance participation. Only team and advisor allocations have vesting schedules.',
    category: 'tokenomics',
    tags: ['vesting', 'trading', 'immediate']
  },
  {
    id: 'security-audit',
    question: 'Has the smart contract been audited?',
    answer: 'Yes, our smart contracts have been thoroughly audited by reputable security firms. The audit reports are publicly available, and we\'ve implemented all recommended security measures.',
    category: 'security',
    tags: ['audit', 'security', 'smart contract']
  },
  {
    id: 'supported-wallets',
    question: 'Which wallets are supported?',
    answer: 'We support all major Web3 wallets including MetaMask, WalletConnect, Coinbase Wallet, and other Ethereum-compatible wallets. Make sure your wallet is connected to the Ethereum mainnet.',
    category: 'technical',
    tags: ['wallets', 'metamask', 'walletconnect']
  },
  {
    id: 'gas-fees',
    question: 'How much are the gas fees?',
    answer: 'Gas fees vary based on Ethereum network congestion. We recommend checking current gas prices and considering the total cost including fees. Transactions typically cost between $10-50 depending on network conditions.',
    category: 'technical',
    tags: ['gas fees', 'ethereum', 'cost']
  }
];

export const IDOInfoSections = ({ 
  timeline = defaultTimeline, 
  faqs = defaultFAQs,
  className = ""
}: IDOInfoSectionsProps) => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>;
      case 'current':
        return <Badge className="bg-primary/10 text-primary">In Progress</Badge>;
      default:
        return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general':
        return <Info className="h-4 w-4" />;
      case 'technical':
        return <HelpCircle className="h-4 w-4" />;
      case 'tokenomics':
        return <Target className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const categories = ['all', 'general', 'technical', 'tokenomics', 'security'];
  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Launch Timeline Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            IDO Launch Timeline
          </CardTitle>
          <CardDescription>
            Key milestones and phases of the MOONSET IDO launch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative border rounded-lg p-6 transition-all",
                  phase.status === 'current' && "border-primary bg-primary/5",
                  phase.status === 'completed' && "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                )}
              >
                {/* Connection Line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-8 top-16 w-px h-12 bg-border" />
                )}

                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(phase.status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {phase.icon}
                        <h3 className="font-semibold text-lg">{phase.title}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(phase.status)}
                        <span className="text-sm text-muted-foreground">{phase.date}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{phase.description}</p>

                    {/* Phase Details */}
                    {phase.details && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline Summary */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-primary" />
              <span className="font-medium">Timeline Status</span>
            </div>
            <p className="text-sm text-muted-foreground">
              We are currently in the IDO Launch phase. All previous milestones have been completed successfully, 
              and we're on track for the upcoming phases. Stay updated through our official channels.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>
            Common questions about the MOONSET IDO and token
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="gap-2"
                >
                  {category !== 'all' && getCategoryIcon(category)}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            <Separator />

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(faq.category)}
                        <h4 className="font-medium">{faq.question}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t bg-muted/20"
                      >
                        <div className="p-4">
                          <p className="text-muted-foreground mb-3">{faq.answer}</p>
                          
                          {/* Tags */}
                          {faq.tags && (
                            <div className="flex flex-wrap gap-1">
                              {faq.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* FAQ Footer */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">Still have questions?</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Can't find what you're looking for? Join our community or contact our support team.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Join Discord
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 