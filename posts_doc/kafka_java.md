## Integration of kafka with Java

O Kafka foi desenvolvido pela equipe do Linkedin e e seu codigo fonte foi doado para a comumidade (Apache Software Foundation). O Kafka foi projetado para lidar com altos volumes de eventos de dados ou mensagens, tornando-o ideal para cenarios como processamento de logs, analise em tempo real e integrações entre sistemas.

## Casos de uso

**Rastreio de atividades em tempo real**: Um usuario navegando no website é possivel gerar informações passivas a respeito de suas atividades e adiciona-las ao seu perfil. As mensagens podem ser publicadas para um ou mais topicos a serem consumidos pelo back-end.

**Pipelines de dados em tempo real**: Mover grandes quantidades de dados de um ponto A para um ponto B em tempo real.

**Monitoramento e Logging**: Coletar, armazenar e analisar logs e métricas de diversos serviços e aplicações. Pode facilmente ser integrado com sistemas que utilizam Hadoop ou Elasticsearch.

**Integração de Sistemas**: Atuar como um hub centralizado para integrar diferentes sistemas em uma arquitetura orientada a eventos.

**Análise em Tempo Real**: Processar e analisar grandes streams de dados em tempo real.

**Backup e Replicação**: Replicar dados entre clusters ou data centers.

## Principais conceitos

**Tópicos**: No Kafka, as mensagens são categorizadas em tópicos. Produtores publicam mensagens em tópicos, e consumidores leem mensagens desses tópicos.

**Partições**: Tópicos são divididos em partições para permitir paralelismo. Cada partição é uma sequência ordenada e imutável de mensagens. As mensagens em partições são identificadas por um índice único chamado de offset.

**Produtores**: São responsáveis por publicar mensagens em tópicos do Kafka.

**Consumidores**: Lêem mensagens de um ou mais tópicos. Eles também rastreiam os offsets das mensagens, para que saibam onde pararam na leitura.

**Brokers**: Um único servidor Kafka é chamado de broker. Normalmente, uma instalação do Kafka envolve múltiplos brokers para garantir escalabilidade e resiliência.

**Zookeeper**: O Kafka usa o Apache ZooKeeper para gerenciar e coordenar brokers. O ZooKeeper é usado para manter metadados e liderança de partições.

**Replicação**: Para garantir a durabilidade e a resiliência, as mensagens são replicadas em vários brokers. Se um broker falhar, as replicas garantem que nenhum dado seja perdido.

**Stream Processing**: Além de simplesmente enviar e receber mensagens, o Kafka oferece a capacidade de processar e analisar streams de mensagens em tempo real, com o Kafka Streams e o KSQL.

**Connectores**: O Kafka Connect é uma ferramenta para conectar Kafka a várias fontes ou sinks (como bancos de dados, sistemas de mensagens, etc.) de forma escalável e confiável.

**Durabilidade e Retenção**: As mensagens no Kafka são persistentes e configuradas para serem retidas por um período de tempo específico, o que significa que os consumidores podem "replay" mensagens se necessário.

## Vantagens do Kafka:

**Escalabilidade**: O Kafka é projetado para escalar horizontalmente, adicionando mais brokers conforme necessário.

**Desempenho**: Capaz de manipular milhares de eventos por segundo com latência muito baixa.

**Durabilidade**: As mensagens são persistentes e replicadas para garantir a resistência contra falhas.

**Flexibilidade**: Suporta múltiplos produtores, múltiplos consumidores e stream processing.

## Configuring Kafka in Java:

```bash
<dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>latest_version</version>
</dependency>
```

Produtor

```bash
import org.apache.kafka.clients.producer.*;
import java.util.Properties;

public class SimpleProducer {

    public static void main(String[] args) {
        String topicName = "SimpleTopic";

        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        Producer<String, String> producer = new KafkaProducer<>(props);

        ProducerRecord<String, String> record = new ProducerRecord<>(topicName, "key", "value");
        producer.send(record, (metadata, exception) -> {
            if (exception == null) {
                System.out.printf("Sent message with offset %d\n", metadata.offset());
            } else {
                exception.printStackTrace();
            }
        });

        producer.close();
    }
}
```

Consumidor:

```bash
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

public class SimpleConsumer {

    public static void main(String[] args) {
        String topicName = "SimpleTopic";

        Properties props = new Properties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "test-group");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer");
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer");

        Consumer<String, String> consumer = new KafkaConsumer<>(props);

        consumer.subscribe(Collections.singletonList(topicName));

        long endTimeMillis = System.currentTimeMillis() + 60000; // +60000 milissegundos = 1 minuto

        while (System.currentTimeMillis() < endTimeMillis) {
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

            records.forEach(record -> {
                System.out.printf("Consumed record with key %s and value %s\n", record.key(), record.value());
            });
        }

        consumer.close();
    }
}

```
Neste exemplo, o consumidor irá consumir mensagens por 1 minuto e depois encerrar. 
