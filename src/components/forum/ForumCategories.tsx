
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ForumCategoriesProps {
  categories: any[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

export const ForumCategories = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: ForumCategoriesProps) => {
  return (
    <Card className="bg-[#121212] border-gray-800">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'border border-gray-800 hover:bg-gray-900'
                }`}
              >
                <span className="font-medium">{category.name}</span>
                {category.post_count > 0 && (
                  <Badge variant="outline" className="bg-gray-800">
                    {category.post_count}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
