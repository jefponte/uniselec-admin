Executar as migrations:

    docker exec -it uniselec-api bash -c "php artisan migrate"


Links:

    Ideal:

        Página do candidato:

            Produção:

                https://uniselec.unilab.edu.br

            Homologação:

                https://uniselec-staging.unilab.edu.br

        Página do Administrador:

            Produção:

                https://uniselec-bo.unilab.edu.br

            Homologação:

                https://uniselec-bo-staging.unilab.edu.br

        API:

            Produção:

                https://uniselec-api.unilab.edu.br

            Homologação:

                https://uniselec-api-staging.unilab.edu.br



O que eu consigo fazer em pouco tempo:




    Página do Candidato:
        Produção:

            https://uniselec.jefponte.com

        Homologação:

            https://uniselec-staging.jefponte.com

        Produção (Link alternativo, serviço gratuito do Firebase):

            https://uniselec.web.app


    Página do administrador:

        Produção:
            https://uniselec-bo.jefponte.com

        Homologação:

            https://uniselec-bo-staging.jefponte.com

        Produção (Link alternativo, serviço gratuito do Firebase):


            https://uniselec-unilab-bo.web.app

    API:

            https://uniselec-api.jefponte.com

            https://uniselec-api-staging.jefponte.com

## Segredos (Sealed Secrets)
```sh
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.33.1/controller.yaml
kubeseal -f regcred-secret.yaml -w base/sealed-secret-regcred.yaml --scope cluster-wide
kubeseal --validate < base/sealed-secret-regcred.yaml
```
### Desprovisionar Deploy
```sh
argocd login argocd.unilab.edu.br --username admin --password "pass" --grpc-web
argocd app list
kubectl -n argocd patch applicationset APPLICATION-NAME-stg-as --type='merge' -p '{"spec":{"generators":[{"list":{"elements":[]}}]}}'
argocd app list | grep APPLICATION-NAME-stg
```

