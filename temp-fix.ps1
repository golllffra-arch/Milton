$c = [System.IO.File]::ReadAllText('src/app/dashboard/student/page.tsx')

$c = $c.Replace('bg-milton-navy text-[10px] font-medium leading-tight text-white', 'bg-muted text-[10px] font-medium leading-tight text-milton-navy')

$c = $c.Replace('bg-gradient-to-r from-milton-navy to-milton-navy/90 text-white shadow-xl', 'border-2 border-milton-navy/20 shadow-xl')

$c = $c.Replace('strokeWidth={9} color="white"', 'strokeWidth={9}')

$c = $c.Replace('text-2xl font-bold">Overall Attendance', 'text-2xl font-bold text-milton-navy">Overall Attendance')

$c = $c.Replace('mt-1 text-white/70', 'mt-1 text-muted-foreground')

$c = $c.Replace('text-sm text-white/70', 'text-sm text-muted-foreground')

$c = $c.Replace('text-xs text-white/70', 'text-xs text-milton-navy/70')

$c = $c.Replace('bg-milton-navy text-white">', 'bg-muted text-milton-navy">')

$c = $c.Replace('sticky left-0 z-10 bg-milton-navy px-4 py-3', 'sticky left-0 z-10 bg-muted px-4 py-3')

$c = $c.Replace('bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg', 'border-l-4 border-l-blue-500 shadow-lg')

$c = $c.Replace('text-sm font-medium text-white/80">Semester GPA', 'text-sm font-medium text-muted-foreground">Semester GPA')

$c = $c.Replace('text-4xl font-bold">{semGPA}', 'text-4xl font-bold text-blue-600">{semGPA}')

$c = $c.Replace('bg-gradient-to-br from-milton-navy to-milton-navy/80 text-white shadow-lg', 'border-l-4 border-l-milton-navy shadow-lg')

$c = $c.Replace('text-sm font-medium text-white/80">Cumulative GPA', 'text-sm font-medium text-muted-foreground">Cumulative GPA')

$c = $c.Replace('text-4xl font-bold">{cumGPA}', 'text-4xl font-bold text-milton-navy">{cumGPA}')

$c = $c.Replace('bg-gradient-to-r from-milton-navy to-milton-navy/90 px-6 py-5 text-white', 'bg-milton-navy/10 px-6 py-5 text-milton-navy')

$c = $c.Replace('bg-white/20', 'bg-milton-navy/10')

$c = $c.Replace('border-white/30 bg-white/10 text-white">Student', 'border-milton-navy/30 bg-milton-navy/10 text-milton-navy">Student')

[System.IO.File]::WriteAllText('src/app/dashboard/student/page.tsx', $c)

Write-Host 'Done! All replacements applied.'