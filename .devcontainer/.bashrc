# Get current Git branch
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

# Custom PS1 prompt: green user@host, blue directory, yellow git branch
export PS1='\[\e[32m\]\u@\h\[\e[m\]:\[\e[34m\]\w\[\e[33m\]$(parse_git_branch)\[\e[m\]\$ '