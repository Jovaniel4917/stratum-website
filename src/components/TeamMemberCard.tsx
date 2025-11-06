import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamMember {
  key: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  linkedin: string;
  email: string;
  image?: string;
}

interface TeamMemberCardProps {
  founder: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ founder }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check if bio text is long enough to need expansion
  const needsExpansion = founder.bio.length > 120; // Approximate character count for 3 lines
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't expand if clicking on social links or buttons
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    if (needsExpansion) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (needsExpansion) {
        setIsExpanded(!isExpanded);
      }
    }
  };
  
  return (
    <Card 
      className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden w-full max-w-[280px] ${
        needsExpansion ? 'cursor-pointer' : ''
      } ${isExpanded ? 'shadow-2xl' : ''}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={needsExpansion ? 0 : -1}
      role={needsExpansion ? 'button' : undefined}
      aria-expanded={needsExpansion ? isExpanded : undefined}
      aria-label={needsExpansion ? `Click to ${isExpanded ? 'collapse' : 'expand'} ${founder.name}'s bio` : undefined}
    >
      <div className="h-64 bg-white overflow-hidden">
        {founder.image ? (
          <img
            src={founder.image}
            alt={`${founder.name} profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-4xl font-telegraf font-bold text-gray-600">
              {founder.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-telegraf font-bold text-base text-primary mb-1">
          {founder.name}
        </h3>
        <p className="font-telegraf font-semibold text-xs text-secondary mb-2">
          {founder.role}
        </p>
        <div className="mb-3">
          <p className={`font-telegraf text-xs text-gray-600 leading-relaxed ${
            isExpanded ? '' : 'line-clamp-3'
          }`}>
            {founder.bio}
          </p>
          {needsExpansion && (
            <button
              className="mt-2 flex items-center gap-1 text-primary hover:text-primary-800 font-telegraf font-semibold text-xs transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              aria-label={isExpanded ? 'Show less' : 'Show more'}
            >
              {isExpanded ? (
                <>
                  <span>{t('about.team.showLess')}</span>
                  <ChevronUp className="h-3 w-3" />
                </>
              ) : (
                <>
                  <span>{t('about.team.showMore')}</span>
                  <ChevronDown className="h-3 w-3" />
                </>
              )}
            </button>
          )}
        </div>
        
        <div>
          <h4 className="font-telegraf font-semibold text-xs text-gray-800 mb-1.5">
            {t('about.team.expertise')}
          </h4>
          <div className="flex flex-wrap gap-1">
            {founder.expertise.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs px-2 py-0.5">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
