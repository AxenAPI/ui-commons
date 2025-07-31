FROM nginx:1.26.2

COPY packages/ui-kit/storybook-static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
