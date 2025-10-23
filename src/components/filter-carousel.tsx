"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface FilterCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect?: (value: string | null) => void;
  data: {
    value: string;
    label: string;
  }[];
};

export const FilterCarousel = ({ value, onSelect, data, isLoading }: FilterCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [curr, setCurr] = useState(0);
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCnt(api.scrollSnapList().length);
    setCurr(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurr(api.selectedScrollSnap() + 1);
    });

  }, [api]);

  return (
    <div className="relative w-full">
      {/* Left fade */}
      <div className={cn("z-10 absolute left-12 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none", curr === 1 && "hidden")} />
      <Carousel className="w-full px-12" opts={{ align: "start", dragFree: true, }} setApi={setApi}>
        <CarouselContent className="-ml-3">
          {!isLoading && (
            <CarouselItem className="pl-3 basis-auto" onClick={() => onSelect?.(null)}>
              <Badge className="rounded-lg py-1 px-3 cursor-pointer whitespace-nowrap text-sm" variant={!value ? "default" : "secondary"}>
                All
              </Badge>
            </CarouselItem>
          )}
          
          {!isLoading && data.map((item) => (
            <CarouselItem className="pl-3 basis-auto" key={item.value} onClick={() => onSelect?.(item.value)}>
              <Badge className="rounded-lg py-1 px-3 cursor-pointer whitespace-nowrap text-sm" variant={value === item.value ? "default" : "secondary"}>
                {item.label}
              </Badge>
            </CarouselItem>
            
          ))}

          {isLoading && (
            Array.from({ length: 14 }).map((_, i) => (
              <CarouselItem className="pl-3 basis-auto" key={i}>
                <Skeleton className="w-[100px] h-full text-sm font-semibold py-1 px-3 rounded-lg">
                  &nbsp;
                </Skeleton>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="z-20 left-0" />
        <CarouselNext className="z-20 right-0" />
      </Carousel>
      {/* Right fade */}
      <div className={cn("z-10 absolute right-12 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none", curr === cnt && "hidden")} />
    </div>
  );
};