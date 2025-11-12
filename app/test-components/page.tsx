'use client';

import { useState } from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter,
  Input, 
  Textarea,
  Badge,
  Section,
  SectionTitle,
  SectionDescription,
} from '@/components/ui';
import { Heart, Download, Send } from 'lucide-react';

/**
 * Component Testing Page
 * Use this page to test and preview all UI components
 * Access at: http://localhost:3000/test-components
 */

export default function TestComponentsPage() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-12">
          UI Components Testing
        </h1>

        {/* Button Tests */}
        <Section background="white">
          <SectionTitle>Buttons</SectionTitle>
          <SectionDescription>
            All button variants, sizes, and states
          </SectionDescription>
          
          <div className="space-y-6">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-3">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<Heart />}>With Left Icon</Button>
                <Button rightIcon={<Download />}>With Right Icon</Button>
                <Button leftIcon={<Send />} rightIcon={<Heart />}>
                  Both Icons
                </Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-lg font-semibold mb-3">States</h3>
              <div className="flex flex-wrap gap-3">
                <Button isLoading onClick={handleSubmit}>
                  Loading
                </Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Card Tests */}
        <Section background="gray">
          <SectionTitle>Cards</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Simple card with no border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Card content goes here</p>
              </CardContent>
            </Card>

            <Card variant="bordered" hoverable>
              <CardHeader>
                <CardTitle>Bordered Card</CardTitle>
                <CardDescription>Card with border and hover effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Hover over me!</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Card with shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Has a subtle shadow</p>
              </CardContent>
              <CardFooter>
                <Badge variant="primary">Tag</Badge>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* Form Elements */}
        <Section background="white">
          <SectionTitle>Form Elements</SectionTitle>
          <div className="max-w-2xl mx-auto space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="We'll never share your email"
              fullWidth
              required
            />

            <Input
              label="With Error"
              type="text"
              error="This field is required"
              fullWidth
            />

            <Textarea
              label="Your Message"
              placeholder="Type your message here..."
              rows={5}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              helperText="Maximum 1000 characters"
              maxLength={1000}
              showCharCount
              fullWidth
              required
            />

            <Button 
              variant="primary" 
              fullWidth
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Submit Form
            </Button>
          </div>
        </Section>

        {/* Badges */}
        <Section background="gray">
          <SectionTitle>Badges</SectionTitle>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Tech Stack Example</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">React</Badge>
                <Badge variant="primary">TypeScript</Badge>
                <Badge variant="primary">Next.js</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Node.js</Badge>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}