import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, Filter, X } from "lucide-react";
import { resources } from "../../../shared/data/resources";
import { Resource, ReadingState } from "../../../shared/types/resource";
import { ResourceCard } from "@/components/ResourceCard";
import { useResourceState } from "@/hooks/useResourceState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Resources() {
  const [location, setLocation] = useLocation();
  const {
    setResourceState,
    getResourceState,
    setResourceNotes,
    getResourceNotes,
    getStateCounts,
  } = useResourceState();

  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const [searchTerm, setSearchTerm] = useState(urlParams.get("search") || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    urlParams.get("tags")?.split(",").filter(Boolean) || []
  );
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(
    urlParams.get("authors")?.split(",").filter(Boolean) || []
  );
  const [selectedStates, setSelectedStates] = useState<ReadingState[]>(
    (urlParams.get("states")?.split(",").filter(Boolean) as ReadingState[]) ||
      []
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    if (selectedAuthors.length > 0)
      params.set("authors", selectedAuthors.join(","));
    if (selectedStates.length > 0)
      params.set("states", selectedStates.join(","));

    const newUrl = params.toString()
      ? `/resources?${params.toString()}`
      : "/resources";
    if (location !== newUrl) {
      setLocation(newUrl, { replace: true });
    }
  }, [searchTerm, selectedTags, selectedAuthors, selectedStates]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    resources.forEach(resource => {
      resource.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  const allAuthors = useMemo(() => {
    return Array.from(new Set(resources.map(r => r.author).filter((a): a is string => !!a))).sort();
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        resource.title.toLowerCase().includes(searchLower) ||
        resource.author?.toLowerCase().includes(searchLower) ||
        resource.summary?.toLowerCase().includes(searchLower) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchLower));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some(tag => resource.tags.includes(tag));

      const matchesAuthors =
        selectedAuthors.length === 0 ||
        (resource.author && selectedAuthors.includes(resource.author));

      const matchesStates =
        selectedStates.length === 0 ||
        selectedStates.includes(getResourceState(resource.id));

      return matchesSearch && matchesTags && matchesAuthors && matchesStates;
    });
  }, [
    searchTerm,
    selectedTags,
    selectedAuthors,
    selectedStates,
    getResourceState,
  ]);

  const groupedResources = useMemo(() => {
    const classics = filteredResources.filter(r => r.section === "必读经典" || (r as any).category === "classic");
    const contemporary = filteredResources.filter(
      r => r.section === "当代视角" || (r as any).category === "contemporary"
    );
    return { classics, contemporary };
  }, [filteredResources]);

  const stateCounts = getStateCounts();

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleAuthor = (author: string) => {
    setSelectedAuthors(prev =>
      prev.includes(author) ? prev.filter(a => a !== author) : [...prev, author]
    );
  };

  const toggleState = (state: ReadingState) => {
    setSelectedStates(prev =>
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setSelectedAuthors([]);
    setSelectedStates([]);
  };

  const hasActiveFilters =
    searchTerm ||
    selectedTags.length > 0 ||
    selectedAuthors.length > 0 ||
    selectedStates.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">学习资源库</h1>
          <p className="text-muted-foreground">
            精选数字设计构成领域的经典著作与当代视角
          </p>
        </header>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">阅读统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">已读:</span>
                <Badge variant="secondary">{stateCounts.已读}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">在读:</span>
                <Badge variant="secondary">{stateCounts.在读}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">想读:</span>
                <Badge variant="secondary">{stateCounts.想读}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">未读:</span>
                <Badge variant="secondary">{stateCounts.未读}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">筛选与搜索</CardTitle>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  aria-label="Clear all filters"
                >
                  <X className="h-4 w-4" />
                  清除筛选
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索资源、作者、标签..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Search resources"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Filter className="h-4 w-4" />
                按标签筛选
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => toggleTag(tag)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleTag(tag);
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Filter className="h-4 w-4" />
                按作者筛选
              </p>
              <div className="flex flex-wrap gap-2">
                {allAuthors.map(author => (
                  <Badge
                    key={author}
                    variant={
                      selectedAuthors.includes(author) ? "default" : "outline"
                    }
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => toggleAuthor(author)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleAuthor(author);
                      }
                    }}
                  >
                    {author}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Filter className="h-4 w-4" />
                按阅读状态筛选
              </p>
              <div className="flex flex-wrap gap-2">
                {(["已读", "在读", "想读", "未读"] as ReadingState[]).map(
                  state => (
                    <Badge
                      key={state}
                      variant={
                        selectedStates.includes(state) ? "default" : "outline"
                      }
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => toggleState(state)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleState(state);
                        }
                      }}
                    >
                      {state}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredResources.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                没有找到匹配的资源，请尝试调整筛选条件
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-12">
            {groupedResources.classics.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  必读经典
                  <Badge variant="secondary">
                    {groupedResources.classics.length}
                  </Badge>
                </h2>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {groupedResources.classics.map(resource => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      readingState={getResourceState(resource.id)}
                      notes={getResourceNotes(resource.id)}
                      onStateChange={state =>
                        setResourceState(resource.id, state)
                      }
                      onNotesChange={notes =>
                        setResourceNotes(resource.id, notes)
                      }
                    />
                  ))}
                </div>
              </section>
            )}

            {groupedResources.contemporary.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  当代视角
                  <Badge variant="secondary">
                    {groupedResources.contemporary.length}
                  </Badge>
                </h2>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {groupedResources.contemporary.map(resource => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      readingState={getResourceState(resource.id)}
                      notes={getResourceNotes(resource.id)}
                      onStateChange={state =>
                        setResourceState(resource.id, state)
                      }
                      onNotesChange={notes =>
                        setResourceNotes(resource.id, notes)
                      }
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
