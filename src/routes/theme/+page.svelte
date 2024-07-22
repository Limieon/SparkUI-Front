<script lang="ts">
	import { Button } from '$ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import { Switch } from '$lib/components/ui/switch';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<div>
	<h1>Buttons</h1>
	<Button>Default</Button>
	<Button variant="secondary">Secondary</Button>
	<Button variant="destructive">Destructive</Button>
	<Button variant="ghost">Ghost</Button>
	<Button variant="outline">Outline</Button>
	<Button variant="link">Link</Button>

	<br />

	<Button disabled>Default</Button>
	<Button variant="secondary" disabled>Secondary</Button>
	<Button variant="destructive" disabled>Destructive</Button>
	<Button variant="ghost" disabled>Ghost</Button>
	<Button variant="outline" disabled>Outline</Button>
	<Button variant="link" disabled>Link</Button>

	<h1>Progress</h1>
	<Progress value={33} class="mb-2" />

	<h1>Toggles</h1>
	<Switch />
	<Checkbox />

	<h1>Nav</h1>
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/theme">Theme</Breadcrumb.Link>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<h1>Badge</h1>
	<Badge>Default</Badge>
	<Badge variant="secondary">Secondary</Badge>
	<Badge variant="destructive">Destructive</Badge>
	<Badge variant="outline">Outline</Badge>

	<h1>Input</h1>
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="email-2">Email</Label>
		<Input type="email" id="email-2" placeholder="Email" />
		<p class="text-sm text-muted-foreground">Enter your email address.</p>
	</div>
</div>
